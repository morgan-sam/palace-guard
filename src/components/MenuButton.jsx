const MenuButton = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="border-double border-8 border-black bg-white w-fit"
    >
      <h2 className="text-8xl ml-2 mb-2 mr-4 mt-0">{text}</h2>
    </button>
  );
};

export default MenuButton;
