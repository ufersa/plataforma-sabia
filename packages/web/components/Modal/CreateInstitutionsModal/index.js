/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete, { geocodeByPlaceId } from 'react-places-autocomplete';
import { toast } from '../../Toast';
import {
	Form,
	Actions,
	InputField,
	InputHiddenField,
	MaskedInputField,
	SelectField,
	RequiredIndicator,
} from '../../Form';
import { InputLabel } from '../../Form/styles';
import { Container, Button, Suggestion, GoogleAddressSugestions } from './styles';
import { Cell, Row } from '../../Common';
import { createInstitutions } from '../../../services';
import { STATES } from '../../../utils/enums/states.enum';
import { unMask } from '../../../utils/helper';

const InstitutionsForm = ({ form, closeModal, loading }) => {
	const [loadingPlace, setLoadingPlace] = useState(false);
	const [addressFields, setAddressFields] = useState(false);
	const [addressInput, setAddressInput] = useState('');

	const onSelect = async (placeId) => {
		setLoadingPlace(true);
		setAddressFields(true);
		const response = await geocodeByPlaceId(placeId);
		if (response) {
			const address = response[0];
			form.setValue('address', address.address_components[1]?.long_name);
			form.setValue('district', address.address_components[2]?.long_name);
			form.setValue('zipcode', address.address_components[6]?.long_name);
			form.setValue('state', {
				label: address.address_components[4]?.short_name,
				value: address.address_components[4]?.short_name,
			});
			form.setValue('city', address.address_components[3]?.long_name);
			form.setValue('lat', address.geometry.location.lat());
			form.setValue('lng', address.geometry.location.lng());
			setLoadingPlace(false);
		}
	};

	return (
		<>
			<Row>
				<Cell col={12}>
					<InputField
						form={form}
						label="Nome"
						name="name"
						type="text"
						validation={{ required: true }}
						variant="gray"
					/>
				</Cell>
			</Row>
			<Row>
				<Cell col={4}>
					<InputField
						form={form}
						label="Sigla"
						name="initials"
						type="text"
						validation={{ required: true }}
						variant="gray"
					/>
				</Cell>
				<Cell col={8}>
					<MaskedInputField
						form={form}
						name="cnpj"
						label="CNPJ"
						placeholder=""
						mask="99.999.999/9999-99"
						pattern={/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/} // eslint-disable-line no-useless-escape
						validation={{ required: true }}
						variant="gray"
					/>
				</Cell>
			</Row>
			<Row>
				<Cell col={12}>
					<InputLabel>
						Logradouro <RequiredIndicator />
					</InputLabel>
					<PlacesAutocomplete
						id="placeId"
						name="place_id"
						variant="gray"
						value={addressInput}
						onChange={(value) => setAddressInput(value)}
						onSelect={(value, placeId) => onSelect(placeId)}
					>
						{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
							<div>
								<InputField
									{...getInputProps({
										placeholder: 'Procurar localidades...',
										className: 'location-search-input',
									})}
									form={{ register: () => {} }}
									variant="gray"
								/>
								<div className="autocomplete-dropdown-container">
									{loading && (
										<GoogleAddressSugestions>
											Carregando...
										</GoogleAddressSugestions>
									)}
									<GoogleAddressSugestions>
										{suggestions.map((suggestion) => {
											const style = suggestion.active
												? { backgroundColor: '#fafafa' }
												: { backgroundColor: '#fff' };
											return (
												<div
													{...getSuggestionItemProps(suggestion, {
														style,
													})}
													key={suggestion.placeId}
												>
													<Suggestion>
														{suggestion.description}
													</Suggestion>
												</div>
											);
										})}
									</GoogleAddressSugestions>
								</div>
							</div>
						)}
					</PlacesAutocomplete>
				</Cell>
			</Row>
			{addressFields && addressInput !== '' && (
				<>
					<Row>
						<Cell col={8}>
							<InputField
								form={form}
								label="Bairro"
								name="district"
								type="text"
								validation={{ required: true }}
								variant="gray"
								disabled={loadingPlace}
							/>
						</Cell>
						<Cell col={4}>
							<MaskedInputField
								form={form}
								name="zipcode"
								label="CEP"
								placeholder="12345-123"
								mask="99999-999"
								pattern={/^\d{5}-\d{3}$/}
								validation={{ required: true }}
								variant="gray"
								disabled={loadingPlace}
							/>
						</Cell>
					</Row>
					<Row>
						<Cell col={6}>
							<SelectField
								form={form}
								name="state"
								label="UF"
								validation={{ required: true }}
								options={STATES.map((state) => ({ label: state, value: state }))}
								variant="gray"
								disabled={loadingPlace}
							/>
						</Cell>
						<Cell col={6}>
							<InputField
								form={form}
								label="Cidade"
								name="city"
								type="text"
								validation={{ required: true }}
								variant="gray"
								disabled={loadingPlace}
							/>
						</Cell>
					</Row>
				</>
			)}
			<InputHiddenField form={form} name="address" />
			<InputHiddenField form={form} name="lat" />
			<InputHiddenField form={form} name="lng" />
			<Actions center>
				<Button
					type="button"
					variant="outlined"
					onClick={() => closeModal()}
					disabled={loading}
				>
					Cancelar
				</Button>
				<Button type="submit" disabled={loading}>
					Cadastrar
				</Button>
			</Actions>
		</>
	);
};

InstitutionsForm.propTypes = {
	form: PropTypes.shape({
		setValue: PropTypes.func.isRequired,
	}).isRequired,
	loading: PropTypes.bool.isRequired,
	closeModal: PropTypes.func.isRequired,
};

const CreateInstitutionsModal = ({ closeModal }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async ({ cnpj, zipcode, state, ...data }) => {
		setIsSubmitting(true);

		const result = await createInstitutions({
			...data,
			zipcode: unMask(zipcode),
			cnpj: unMask(cnpj),
			state: state.value,
		});

		setIsSubmitting(false);

		if (result?.error) {
			if (result?.error?.error_code === 'VALIDATION_ERROR') {
				toast.error(result.error.message[0].message);
			} else {
				toast.error('Não foi possível cadastrar a instituição');
			}
		} else {
			toast.success('Instituição cadastrada');
			closeModal();
		}
	};

	return (
		<Container>
			<h3>Cadastrar nova Organização</h3>
			<Form onSubmit={handleSubmit} aria-label="form">
				<InstitutionsForm loading={isSubmitting} closeModal={closeModal} />
			</Form>
		</Container>
	);
};

CreateInstitutionsModal.propTypes = {
	closeModal: PropTypes.func.isRequired,
};

export default CreateInstitutionsModal;
