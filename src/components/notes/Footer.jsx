const Footer = () => {
  const footerStyle = {
    background: '#333',
    color: '#eee',
    padding: '4px 10px',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
  };

  return (
    <div style={footerStyle}>
      <p>Notes app - Full Stack Open Course - @llfalcao</p>
    </div>
  );
};

export default Footer;
