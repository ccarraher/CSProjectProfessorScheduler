import { IconTypeMap } from '@mui/material'
import * as MUIcon from '@mui/icons-material'

export const Icon = (props: IconProps) => {
    const { name } = props
    const Icon = MUIcon[name as keyof typeof MUIcon]
    if (Icon == null) {
      throw `There is no "${name}" Icon`
    }
    return <Icon {...props} />
}

type MuiIconProps = IconTypeMap['props']

interface IconProps extends MuiIconProps {
  name: string | undefined
}