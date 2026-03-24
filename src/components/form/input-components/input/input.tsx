import style from "../../forms.module.css";

type Props = {
    label: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
    value: string;
    type?: string;
}

export default function Input({ label, setState, value, type = "text" }: Props) {
    return (
        <div>
            <input 
                className={style.input}
                placeholder={label}
                id={label}
                type={type}
                value={value}
                onChange={(e) => setState(e.target.value)}
            />
        </div>
    );
}