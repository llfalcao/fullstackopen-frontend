const Notification = ({ message }) => {
  if (!message) {
    return null;
  }

  const notificationStyle = {
    background: '#69d369',
    color: '#101112',
    margin: '8px 0',
    padding: '4px 20px',
    borderRadius: '4px',
    width: 'max-content',
  };

  return (
    <div style={notificationStyle}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
