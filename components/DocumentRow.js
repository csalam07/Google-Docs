import { useRouter } from "next/dist/client/router";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";

function DocumentRow({ id, fileName, date }) {
  const router = useRouter();

  return (
    <div
      className="flex items-center py-4 rounded-lg hover:cursor-pointer hover:bg-gray-100 text-gray-700 text-sm"
      onClick={() => router.push(`/doc/${id}`)}
    >
      <Icon name="article" size="3xl" color="blue" />
      <p className="flex-grow pl-5 w-10 pr-10 truncate">{fileName}</p>
      <p className="pr-12 text-sm italic">
        {date?.toDate().toLocaleDateString()}
      </p>
      <Button
        color="gray"
        buttonType="link"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="w-20 border-0"
      >
        <Icon name="more_vert" size="3xl" />
      </Button>
    </div>
  );
}

export default DocumentRow;
