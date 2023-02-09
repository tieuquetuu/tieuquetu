import React, { Fragment } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import {Typography} from "@mui/material";
// import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Fragment>
      <Typography variant={'h1'} component={'div'} align={'center'}>
        Portfolio
      </Typography>
    </Fragment>
  )
}
