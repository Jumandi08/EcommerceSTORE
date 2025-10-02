import {cn} from "@/lib/utils"

interface IconButtonProps {
  onClick?: () => void,
  icon: React.ReactElement
  className?: string
}

const IconButton = (props: IconButtonProps) => {
    const {onClick, icon, className} = props;
  return (
    <button 
      onClick={onClick}
      className={cn("rounded-full fles items-center bg-white borde shadow-md p-2 hover:scale-110 transition", className)}
    >
      {icon}
    </button>
  )
}

export default IconButton