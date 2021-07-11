import Icon from "@material-tailwind/react/Icon";
import db from "../lib/firebase";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { useSession } from "next-auth/client";
import DocumentRow from "./DocumentRow";

function SavedWork() {
  const [session] = useSession();

  const [snapshot] = useCollectionOnce(
    db
      .collection("userDocs")
      .doc(session.user.email)
      .collection("docs")
      .orderBy("timestamp", "desc"),
  );
  return (
    <section className="bg-white px-10 md:px-0">
      <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
        <div className="flex items-center justify-between pb-5 border-b-2 border-gray-200">
          <h2 className="font-medium flex-grow">Recent documents</h2>
          <p className="mr-12 italic">Date created</p>
          <Icon name="folder" size="3xl" color="blue" />
        </div>
        {snapshot?.docs.map((doc) => (
          <DocumentRow
            key={doc.id}
            id={doc.id}
            fileName={doc.data().filename}
            date={doc.data().timestamp}
          />
        ))}
      </div>
    </section>
  );
}

export default SavedWork;
