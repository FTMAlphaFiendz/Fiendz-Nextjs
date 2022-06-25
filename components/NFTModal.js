/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
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
          <h4 className="text-lg font-inter">{activeNFT?.name}</h4>
        </Modal.Title>
        <button className="text-2xl" onClick={onHide}>
          <AiOutlineClose />
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col items-center">
          <div className="my-3 "></div>
          <img
            src={activeNFT?.image}
            alt={activeNFT?.name}
            style={{ height: "300px", width: "275px" }}
            className="mb-2 nft-border"
          />
          {activeNFT?.attributes && (
            <>
              <h6 className="text-lg font-inter text-border my-1">
                Attributes
              </h6>
              <div className="flex flex-wrap justify-center">
                {activeNFT.attributes.map((attribute) => {
                  return (
                    <div
                      key={attribute.trait_type}
                      className="px-3 py-1 font-inter text-sm attributes "
                    >
                      {`${attribute.trait_type}: `}
                      {"  "}
                      {attribute.value}

                      {attribute.rarityPercent &&
                        `${" - "}${attribute.rarityPercent}%`}
                    </div>
                  );
                })}
              </div>
            </>
          )}
          <h6 className="text-lg font-inter text-border mt-3 ">
            Wallet Score - {activeNFT?.walletScore}
          </h6>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <MainButton text="Close" closeModal={onHide} />
      </Modal.Footer>
    </Modal>
  );
};

export default NFTModal;
