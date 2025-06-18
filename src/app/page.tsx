import Heading from "../shared/components/topography/Heading";
import Text from "../shared/components/topography/Text";

const page = () => {
  return (
    <div className="text-center h-5/6 text-green-700 text-2xl font-bold content-center justify-center ">
      <Heading retro>Starting page</Heading>
      <div className="animate-spin">{<Text retro>{":)"}</Text>}</div>
      <Text retro>TODO</Text>
    </div>
  );
};

export default page;
