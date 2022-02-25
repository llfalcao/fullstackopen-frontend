const Button = ({ text, increment }) => {
  return (
    <button type="button" onClick={increment}>
      {text}
    </button>
  );
};

export default Button;
