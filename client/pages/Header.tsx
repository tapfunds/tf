import Head from "next/head";

type Props = {
  headerText: string;
};

const Header = (props: Props) => {
  const { headerText } = props;
  return (
    <Head>
      <title>{headerText}</title>
      <meta name="description" content="Modern Banking Solution" />
      <link rel="icon" href="/images/icon.png" />
    </Head>
  );
};

export default Header;
