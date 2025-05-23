"use client"

import moment from "moment"
import "moment/locale/ru"
import {useEffect} from "react"

type Props = {
	children: React.ReactNode
}

function MomentProvider({children}: Props) {
	useEffect(() => {
		moment.locale("ru")
	}, [])

	return <>{children}</>
}

export {MomentProvider}
