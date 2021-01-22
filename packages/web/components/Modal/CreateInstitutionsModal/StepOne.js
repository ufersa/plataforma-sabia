/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete, { geocodeByPlaceId } from 'react-places-autocomplete';
import {
	InputField,
	MaskedInputField,
	RequiredIndicator,
	SelectField,
	InputHiddenField,
} from '../../Form';
import { Cell, Row } from '../../Common';
import { InputLabel } from '../../Form/styles';
import { Suggestion, GoogleAddressSugestions } from './styles';
import { STATES } from '../../../utils/enums/states.enum';
import { mapArrayOfObjectToSelect } from '../../../utils/helper';

const StepOne = ({ form }) => {
	const { setValue } = form;
	const [loadingPlace, setLoadingPlace] = useState(false);
	const [addressFields, setAddressFields] = useState(false);
	const [addressInput, setAddressInput] = useState('');

	const onSelect = async (placeId) => {
		setLoadingPlace(true);
		setAddressFields(true);
		const response = await geocodeByPlaceId(placeId);
		if (response) {
			const address = response[0];
			const state = address.address_components[4]?.short_name;
			setValue('address', address.address_components[1]?.long_name);
			setValue('district', address.address_components[2]?.long_name);
			setValue('zipcode', address.address_components[6]?.long_name);
			setValue('state', state);
			setValue('city', address.address_components[3]?.long_name);
			setValue('lat', address.geometry.location.lat());
			setValue('lng', address.geometry.location.lng());
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
						{({
							getInputProps,
							suggestions,
							getSuggestionItemProps,
							loading: placesLoading,
						}) => (
							<div>
								<InputField
									{...getInputProps({
										placeholder: 'Procurar localidades...',
										className: 'location-search-input',
									})}
									form={{ register: () => {} }}
									variant="gray"
									name="places"
								/>
								<div className="autocomplete-dropdown-container">
									{placesLoading && (
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
								onChange={([option]) => {
									setValue('state', option.value);
									return option;
								}}
								options={mapArrayOfObjectToSelect(STATES, 'initials', 'initials')}
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
		</>
	);
};

StepOne.propTypes = {
	form: PropTypes.shape({
		watch: PropTypes.func,
		getValues: PropTypes.func,
		setValue: PropTypes.func,
	}),
};

StepOne.defaultProps = {
	form: {},
};

export default StepOne;
