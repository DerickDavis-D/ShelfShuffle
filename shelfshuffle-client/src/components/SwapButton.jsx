const SwapButton = ({ onLike, onDislike }) => {
    return (
      <div className="flex gap-4">
        <button onClick={onDislike} className="bg-red-500 text-white px-6 py-2 rounded">
          Dislike
        </button>
        <button onClick={onLike} className="bg-green-500 text-white px-6 py-2 rounded">
          Like
        </button>
      </div>
    );
  };
  
  export default SwapButton;