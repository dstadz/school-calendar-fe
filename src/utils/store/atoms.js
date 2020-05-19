import React from 'react'
import { atom, useRecoilState } from 'recoil'


export const templateFormOpen = atom({
  key: 'templateFormOpen',
  default: false
})

export const selectedarr = atom({
  key: 'selectedArr',
  default: []
})