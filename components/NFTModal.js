import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Image from "next/image";
import { formatUrl } from "../helpers/utils";
import MainButton from "./MainButton";
import { AiOutlineClose } from "react-icons/ai";

const NFTModal = ({ show, onHide, activeNFT }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4 className="text-lg font-inter">{activeNFT.name}</h4>
        </Modal.Title>
        <button className="text-2xl" onClick={onHide}>
          <AiOutlineClose />
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col items-center">
          <div className="my-3 ">
            <Image
              src={formatUrl(activeNFT.image)}
              alt={activeNFT.name}
              height={300}
              width={275}
              priority={true}
            />
          </div>
          <p className="font-inter text-center md:w-10/12">
            {activeNFT.description}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <MainButton text="Close" closeModal={onHide} />
      </Modal.Footer>
    </Modal>
  );
};

export default NFTModal;
