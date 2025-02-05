import { useRouter } from "expo-router";
import { Fragment, useEffect } from "react";

const ResetToRoot = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/");
    }, 0);
  });
  return <Fragment></Fragment>;
};

export default ResetToRoot;