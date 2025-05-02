import classes from './style.module.scss';
interface Iprops {
  name: string;
  label: string;
  value: string | number;
  data: Array<{ label: string; value: string | number,data?:any }>;
  onChange?: (v: string | number,data?:any) => void;
  allignment?: 'horizontal' | 'vertical';
  required?: boolean;
  className?:string
}
const RadioButton = ({
  name,
  label,
  value = '',
  data,
  onChange,
  required,
  allignment = 'horizontal',
  className=''
}: Iprops) => {
  return (
    <div>
      {label && 
      <span className='flex font-semibold fs-15'>
        {label}
      </span>}
      {allignment === 'horizontal' ? (
        <div className={`flex items-center gap-4 h-11 ${className}`}>
          {data.map((radio, i) => (
            <span
              className={
                value === radio.value
                  ? `${classes.radio} ${classes.active}`
                  : classes.radio
              }
              key={`${name}-${i}`}
              onClick={(e) => {
                onChange?.(radio.value,radio.data);
              }}
            >
              <span className={`${classes.dot}`}></span>
              <span className='font-semibold fs-15' style={{ marginBottom: 0 }}>
                {radio.label}
              </span>
            </span>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default RadioButton;
