import * as React from "react"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import { IState, SetStateFunc } from "./IState"

export function TypeSwitch({ state, setState }: IProps) {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Type</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={state.type ? state.type : "xml"}
        name="radio-buttons-group"
        onChange={(e) => {  setState({ ...state, type: e.target.value }) }}
      >
        <FormControlLabel value="xml" control={<Radio />} label="XML" />
        <FormControlLabel value="binary" control={<Radio />} label="Binary" />
      </RadioGroup>
    </FormControl>
  )
}

interface IProps {
  state: Partial<IState>,
  setState: SetStateFunc
}