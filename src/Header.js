import Logo from "./Logo";

export default function Header(props) {
  return (
    <header>
        <Logo />
        <input type="checkbox" onChange={props.handleChange} />
    </header>
  );
}
