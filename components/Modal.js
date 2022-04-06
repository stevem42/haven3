const Modal = ({ showModal, setShowModal, handleDelete }) => {
  return (
    <>
      {showModal ? (
        <div className="fixed inset-0 z-50 overflow-auto bg-smoke flex">
          <div className="relative p-8 bg-purple-400 w-full max-w-md m-auto flex-col flex rounded-lg text-center">
            ARE YOU SURE?
            <span className="absolute top-0 right-0 p-4">
              <button onClick={setShowModal}>X</button>
            </span>
            <div className="w-50">
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 font-bold mt-10 py-2 px-4 border border-red-700 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
