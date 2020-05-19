import React from 'react'
import { atom } from 'recoil'


export const itemWithID = id =>  atom({
  key: `item${id}`,
  default: {}
})


export const templateFormOpen = atom({
  key: 'templateFormOpen',
  default: false
})

export const selected = atom({
  key: 'templateFormOpen',
  default: []
})