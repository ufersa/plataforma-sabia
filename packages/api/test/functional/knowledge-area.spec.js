const { trait, test } = use('Test/Suite')('Knowledge Area');

const KnowledgeArea = use('App/Models/KnowledgeArea');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('GET /areas/:knowledge_area_id Gets a single Knowledge Area', async ({ client }) => {
	// Ciências Exatas e da Terra
	const knowledgeArea = await KnowledgeArea.getKnowledgeArea(10000003);

	const response = await client.get(`/areas/${knowledgeArea.knowledge_area_id}`).end();

	response.assertStatus(200);
	response.assertJSONSubset(knowledgeArea.toJSON());
});

test('GET /areas Gets all areas of a great area', async ({ client, assert }) => {
	// Ciências Exatas e da Terra
	const greatArea = await KnowledgeArea.getKnowledgeArea(10000003);
	const level = 2;

	const response = await client
		.get(`/areas?level=${level}&greatArea=${greatArea.knowledge_area_id}`)
		.end();

	response.assertStatus(200);
	const knowledgeareas = response.body;
	knowledgeareas.forEach((knowledgearea) => {
		assert.equal(knowledgearea.level, level);
		assert.equal(knowledgearea.great_area_id, greatArea.knowledge_area_id);
		assert.equal(knowledgearea.area_id, knowledgearea.knowledge_area_id);
		assert.equal(knowledgearea.sub_area_id, null);
		assert.equal(knowledgearea.speciality_id, null);
	});
});

test('GET /areas Gets all sub-areas of a area', async ({ client, assert }) => {
	// Ciências Exatas e da Terra
	const greatArea = await KnowledgeArea.getKnowledgeArea(10000003);
	// Matemática
	const area = await KnowledgeArea.getKnowledgeArea(10100008);
	const level = 3;

	const response = await client.get(`/areas?level=${level}&area=${area.knowledge_area_id}`).end();

	response.assertStatus(200);
	const knowledgeareas = response.body;
	knowledgeareas.forEach((knowledgearea) => {
		assert.equal(knowledgearea.level, level);
		assert.equal(knowledgearea.great_area_id, greatArea.knowledge_area_id);
		assert.equal(knowledgearea.area_id, area.knowledge_area_id);
		assert.equal(knowledgearea.sub_area_id, knowledgearea.sub_area_id);
		assert.equal(knowledgearea.speciality_id, null);
	});
});

test('GET /areas Gets all specialities of a sub-area', async ({ client, assert }) => {
	// Ciências Exatas e da Terra
	const greatArea = await KnowledgeArea.getKnowledgeArea(10000003);
	// Matemática
	const area = await KnowledgeArea.getKnowledgeArea(10100008);
	// Álgebra
	const subArea = await KnowledgeArea.getKnowledgeArea(10101004);
	const level = 4;

	const response = await client
		.get(`/areas?level=${level}&subArea=${subArea.knowledge_area_id}`)
		.end();

	response.assertStatus(200);
	const knowledgeareas = response.body;
	knowledgeareas.forEach((knowledgearea) => {
		assert.equal(knowledgearea.level, level);
		assert.equal(knowledgearea.great_area_id, greatArea.knowledge_area_id);
		assert.equal(knowledgearea.area_id, area.knowledge_area_id);
		assert.equal(knowledgearea.sub_area_id, subArea.sub_area_id);
		assert.equal(knowledgearea.speciality_id, knowledgearea.speciality_id);
	});
});
