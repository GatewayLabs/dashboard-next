"use client"
import { Session } from "next-auth";
import { PropsWithChildren, createContext, useContext } from "react";

import { Api, api, apiPublic } from "@/services/protocol/api";

type SessionType = {
  session: Session | null
  privateApi: Api
}

export const SessionContext = createContext<SessionType>({
  session: null,
  privateApi: apiPublic
})

export function SessionProvider({ children, session }: PropsWithChildren<{ session: Session | null }>) {
  return (
    <SessionContext.Provider value={{ session, privateApi: api(session?.token ?? "") }}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = () => useContext(SessionContext);