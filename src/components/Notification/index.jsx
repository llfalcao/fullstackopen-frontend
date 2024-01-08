const Notification = ({ content, error }) => {
  if (!content) {
    return null;
  }

  const notificationStyle = {
    margin: '8px 0',
    width: 'max-content',
  };

  const messageStyle = {
    background: error ? 'crimson' : '#69d369',
    color: error ? '#eee' : '#101112',
    borderRadius: '4px',
    padding: '4px 20px',
    margin: '4px 8px',
  };

  return (
    <div className="notification" style={notificationStyle}>
      {typeof content === 'string' ? (
        <p style={messageStyle}>{content}</p>
      ) : (
        Object.values(content).map((msg) => (
          <p key={msg} style={messageStyle}>
            {msg}
          </p>
        ))
      )}
    </div>
  );
};

export default Notification;
