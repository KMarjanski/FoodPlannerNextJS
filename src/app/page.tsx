import Heading from "../shared/components/topography/Heading";
import Text from "../shared/components/topography/Text";

const page = () => {
  return (
    <div className="text-center h-5/6 text-green-700 text-2xl font-bold content-center justify-center ">
      <Heading>Starting page</Heading>
      <div className="animate-spin">{<Text>{":)"}</Text>}</div>
      <Text>TODO</Text>
    </div>
  );
};

export default page;
