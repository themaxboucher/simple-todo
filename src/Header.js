export default function Header(props) {
    return (
        <header>
            <h1 className="logo">Simple To-Do</h1>
            <input type="checkbox" onChange={props.handleChange}/>
        </header>
    );
}