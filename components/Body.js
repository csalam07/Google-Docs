import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Card from "./Card";
import { useState } from "react";
import { useSession } from "next-auth/client";
import InputIcon from "@material-tailwind/react/InputIcon";
import db from "../lib/firebase";
import firebase from "firebase";
import SavedWork from "./SavedWork";

function Body() {
  const [session] = useSession();
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");
  const [showTemplate, setShowTemplate] = useState(false);

  const createDocument = () => {
    if (!input) return;

    db.collection("userDocs").doc(session.user.email).collection("docs").add({
      filename: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
    setShowModal(false);
  };

  const modal = (
    <Modal size="sm" active={showModal} toggler={() => setShowModal(false)}>
      <ModalHeader toggler={() => setShowModal(false)}>
        Hello {session?.user?.name.split(" ").slice(-1).join(" ").toUpperCase()}
      </ModalHeader>
      <ModalBody>
        <InputIcon
          value={input}
          type="text"
          color="lightBlue"
          size="regular"
          outline={true}
          placeholder="Enter name of doc"
          iconFamily="material-icons"
          iconName="edit"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && createDocument()}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="red"
          buttonType="link"
          onClick={(e) => setShowModal(false)}
          ripple="dark"
        >
          Cancel
        </Button>

        <Button color="blue" onClick={createDocument} ripple="light">
          Create
        </Button>
      </ModalFooter>
    </Modal>
  );
  return (
    <>
      <section className="bg-[#F8F9FA] pb-10 px-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between py-6">
            <h2 className="text-gray-700 text-lg">Start a new document</h2>

            <div className="flex items-center">
              <Button
                className="hidden md:inline-flex"
                color="lightBlue"
                buttonType="outline"
                size="sm"
                rounded={false}
                block={false}
                iconOnly={false}
                ripple="dark"
                onClick={() => setShowTemplate((value) => !value)}
              >
                template <Icon name="favorite" />
              </Button>

              <Button
                color="gray"
                buttonType="link"
                rounded={true}
                iconOnly={true}
                ripple="dark"
                className="h-20 w-20 border-0"
                onClick={() => setShowTemplate((value) => !value)}
              >
                <Icon name="more_vert" size="3xl" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ">
            <div onClick={() => setShowModal(true)}>
              <Card title="Blank" subTitle="" image="/docs.png" />
            </div>

            <div>
              <Card title="letter" subTitle="Spearmint" image="/letter.png" />
            </div>

            <div className="hidden sm:inline-flex">
              <Card
                title="Brocher"
                subTitle="Modern Writer"
                image="/broucher.png"
              />
            </div>
            <div className="hidden md:inline-flex ">
              <Card
                title="Newsletter"
                subTitle="Lively"
                image="/newsletter.png"
              />
            </div>

            <div className={`${showTemplate ? "inline-flex" : "hidden"}`}>
              <Card title="Resume" subTitle="Swiss" image="/resume.png" />
            </div>

            <div className={`${showTemplate ? "inline-flex" : "hidden"}`}>
              <Card title="Recipe" subTitle="Coral" image="/recipe.png" />
            </div>
            <div className={`${showTemplate ? "inline-flex" : "hidden "}`}>
              <Card title="Report" subTitle="Tropic" image="/report.png" />
            </div>

            <div className={`${showTemplate ? "inline-flex" : "hidden"}`}>
              <Card
                title="Pet resume"
                subTitle="Spearmint"
                image="/letter.png"
              />
            </div>
          </div>
        </div>
      </section>
      {modal}
      <SavedWork />
    </>
  );
}

export default Body;
