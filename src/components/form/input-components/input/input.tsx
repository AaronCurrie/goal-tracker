import style from "../../forms.module.css";

type Props = {
    label: string;
    setState: React.Dispatch<React.SetStateAction<string>> | ((value: string) => void);
    value: string;
    type?: string;
    error?: string;
    ref?: React.Ref<HTMLInputElement>;
}

export default function Input({ref, label, setState, value, type = "text", error }: Props) {
    return (
        <div>
            <input 
                ref={ref}
                className={`${style.input} ${error ? style.error : ""}`}
                placeholder={label}
                id={label}
                type={type}
                value={value}
                onChange={(e) => setState(e.target.value)}
            />
            {error && <p className={style.error}>{error}</p>}
        </div>
    );
}