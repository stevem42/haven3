interface ModalProps {
  showModal: boolean;
  setShowModal: () => void;
  handleDelete: () => Promise<void>;
}

const Modal = ({ showModal, setShowModal, handleDelete }: ModalProps) => {
  return (
    <>
      {showModal ? (
        <div className="fixed inset-0 z-50 overflow-auto bg-smoke flex">
          <div className="relative p-8 bg-[#552583] w-full font-bold max-w-md m-auto flex-col flex rounded-lg text-center text-[#FDB927]">
            ARE YOU SURE?
            <span className="absolute top-0 right-0 p-4">
              <button onClick={setShowModal}>X</button>
            </span>
            <div className="w-50">
              <button
                onClick={handleDelete}
                className="text-[#552583] bg-[#FDB927] hover:bg-yellow-400 font-bold mt-10 py-2 px-4 border border-red-700 rounded"
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
