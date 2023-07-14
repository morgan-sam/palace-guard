const Button = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="border-double border-4 border-black bg-white w-fit"
    >
      <h2 className="text-4xl ml-1 mb-1 mr-2 mt-0">{text}</h2>
    </button>
  );
};

export default Button;
