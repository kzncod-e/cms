export default function Button({ handleClick, id, propName }) {
  return (
    <>
      <button className="btn" onClick={() => handleClick(id)}>
        {propName}
      </button>
    </>
  );
}
