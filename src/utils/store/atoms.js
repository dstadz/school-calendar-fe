import React from 'react'
import {
  atom,
  useRecoilState
} from 'recoil'


export const templateForm = atom({
  key: 'templateForm',
  default: false
})

export const selectedarr = atom({
  key: 'selectedArr',
  default: []
})