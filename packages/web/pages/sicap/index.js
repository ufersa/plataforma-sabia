
const SicapPage = () => {

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      	{/* Exibe o iframe do Power BI com base na localidade selecionada */}
		<iframe
		title="Report Section"
		width="100%"
		height="804"
		src={'https://app.powerbi.com/view?r=eyJrIjoiN2M0ZWZlMDctZTRiZC00OTI0LWFjMjktNTc4NjVlNjE2Njg1IiwidCI6IjQ0MzBkNGIwLTRiMDktNDAxNy1hYzRmLWUwOGUxMjA2MWFmOSJ9&embedImagePlaceholder=true&pageName=0346e3c5402016a4eac7'}
		frameBorder="0"
		allowFullScreen="true"
		style={{ marginBottom: '20px' }}
		></iframe>
    </div>
  );
};

export default SicapPage;
