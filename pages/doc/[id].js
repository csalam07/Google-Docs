import TextEditor from "../../components/editor/TextEditor";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { useRouter } from "next/dist/client/router";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import db from "../../lib/firebase";
import { signOut, getSession, useSession } from "next-auth/client";
import Login from "../../components/Login";
import { useRef } from "react";
import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";
import H6 from "@material-tailwind/react/Heading6";

function Doc() {
  const [session] = useSession();
  const buttonRef = useRef();
  if (!session) return <Login />;

  const router = useRouter();
  const { id } = router.query;

  const [snapshot, laodingSnapshot] = useDocumentOnce(
    db
      .collection("userDocs")
      .doc(session.user.email)
      .collection("docs")
      .doc(id),
  );

  if (!laodingSnapshot && !snapshot?.data()?.filename) {
    router.push("/");
  }
  console.log(snapshot);
  return (
    <div className="sidescroll">
      <header className="flex justify-between items-center p-3 pb-1">
        <span className="cursor-pointer" onClick={() => router.push("/")}>
          <Icon name="description" size="5xl" color="blue" />
        </span>

        <div className="flex-grow px-2">
          <div className="flex items-center space-x-3">
            <H6 color="blueGray">{snapshot?.data()?.filename.toUpperCase()}</H6>
            <span className="cursor-pointer" ref={buttonRef}>
              <Icon name="star_outline" size="md" color="gray" />
            </span>
            <Tooltips placement="bottom" ref={buttonRef}>
              <TooltipsContent>Star</TooltipsContent>
            </Tooltips>
          </div>
          <ul className=" flex text-sm space-x-1 -ml-1 h-8 text-gray-600">
            <li className="option">File</li>
            <li className="option">Edit</li>
            <li className="option">View</li>
            <li className="option">Insert</li>
            <li className="option">Format</li>
            <li className="option">Tools</li>
            <li className="option">Add-ons</li>
            <li className="option">help</li>
          </ul>
        </div>
        <Button
          color="gray"
          buttonType="link"
          rounded="md"
          iconOnly={true}
          ripple="dark"
          className="hidden md:inline-flex mr-4"
        >
          <Icon name="comment" size="md" />
        </Button>

        <Button
          ref={buttonRef}
          color="gray"
          buttonType="outline"
          rounded="md"
          iconOnly={true}
          ripple="dark"
          className="hidden md:inline-flex px-9 mr-4 hover:bg-gray-100"
        >
          <Icon name="present_to_all" size="md" color="blue" />
          <Icon name="arrow_drop_down" size="sm" color="blue" />
        </Button>
        <Tooltips placement="bottom" ref={buttonRef}>
          <TooltipsContent>Present to meeting</TooltipsContent>
        </Tooltips>
        <Button
          ref={buttonRef}
          color="lightBlue"
          buttonType="filled"
          size="regular"
          rounded={false}
          block={false}
          iconOnly={false}
          ripple="light"
          className="hidden md:inline-flex h-10"
        >
          <Icon name="people" size="md" />
          SHARE
        </Button>

        <Tooltips placement="bottom" ref={buttonRef}>
          <TooltipsContent>
            <span className="flex items-center space-x-2">
              <Icon name="lock" size="sm" /> <p>Private to only me</p>
            </span>
          </TooltipsContent>
        </Tooltips>

        <img
          ref={buttonRef}
          src={session?.user?.image}
          alt="user-image"
          className="rounded-full cursor-pointer h-12 w-12 ml-2"
          onClick={signOut}
        />
      </header>
      <Tooltips placement="bottom" ref={buttonRef}>
        <TooltipsContent>
          <ul>
            <li>Google Account</li>
            <li>{session?.user?.name}</li>

            <li>{session?.user?.email}</li>
          </ul>
        </TooltipsContent>
      </Tooltips>
      <TextEditor />
    </div>
  );
}

export default Doc;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
