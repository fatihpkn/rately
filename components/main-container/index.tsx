import * as React from "react";

interface IMainContainerProps {}

const MainContainer: React.FunctionComponent<IMainContainerProps> = (props) => {
  return <main className='max-w-6xl mx-auto my-10 py-2 px-3'>{props.children}</main>;
};

export default MainContainer;
