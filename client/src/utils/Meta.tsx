import { Helmet } from "react-helmet-async";

interface Props {
  title: string;
  children: React.ReactNode;
}

function Meta({ children, title }: Props) {
  return (
    <>
      <Helmet>
        <title>{`The Wild Oasis | ${title}`}</title>
        <meta name="description" content="Place your order at My Restaurant" />
      </Helmet>
      {children}
    </>
  );
}

export default Meta;
