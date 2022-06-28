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
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="flex w-full justify-end">
          {" "}
          <button className="text-2xl" onClick={onHide}>
            <AiOutlineClose />
          </button>
        </div>
        <div className="flex items-center flex-col md:flex-row w-full">
          <div className="w-9/12 md:w-6/12 flex justify-center items-center">
            <img
              src={activeNFT?.image}
              alt={activeNFT?.name}
              style={{ height: "100%", width: "90%" }}
              className="mb-2 nft-border"
            />
          </div>
          <div className="w-full md:w-6/12 flex flex-col p-3 ">
            <div className="mb-4 flex flex-col">
              <div className="font-inter text-border text-lg">
                {activeNFT?.name}
              </div>
              <div className="flex ">
                <p
                  className={`text-border font-inter px-2 rounded-lg modal-status`}
                  style={{
                    backgroundColor: activeNFT?.rarityBackground.toString(),
                  }}
                >
                  {activeNFT?.rarityStatus}
                </p>
                <span className="font-inter text-border ml-2">
                  Wallet Score:{" "}
                  <span className="text-orange-500">
                    {activeNFT?.walletScore}
                  </span>
                </span>
              </div>
            </div>
            {activeNFT?.attributes && (
              <>
                <div className="grid grid-cols-2 gap-2">
                  {activeNFT.attributes.map((attribute) => {
                    return (
                      <div
                        key={attribute.trait_type}
                        className="px-3 py-1 font-inter text-border text-center nft-border bg-lightblue flex flex-col justify-center"
                      >
                        <p className="text-sm font-inter ">
                          {attribute.trait_type}
                        </p>

                        <p className="font-freckle text-base">
                          {attribute.value}
                        </p>
                        <p className="text-sm font-inter text-orange-500">
                          {attribute.rarityPercent &&
                            `${attribute.rarityPercent}% have this`}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default NFTModal;
