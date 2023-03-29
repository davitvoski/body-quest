import { useTheme } from "@mui/material";

const ExperienceBar = (props: {xp: number, xpNext: number, level: number}) => {
    const theme = useTheme();
    const height = window.innerHeight
    const width = window.innerWidth * 0.08
    const end = width - 4

    const xp = props.xp / props.xpNext * end + 2

    const xpDark = "#87050a"
    const xpLight = "#b81414"
    const text = "#EEE8E8"

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox={ "0 -0.5 "+width+" 17" } shape-rendering="crispEdges">
            <title>{ props.xp } XP out of { props.xpNext } until level { props.level + 1}</title>
            {/** Left Wight */}
            <path stroke={ theme.palette.logo.light } d="M2 2h1M1 4h1M1 5h1M1 6h1" />
            <path stroke={ theme.palette.logo.main } d="M3 2h1M2 3h1M2 4h1M1 7h1M1 8h1M1 9h1" />
            <path stroke={ theme.palette.logo.dark } d="M3 3h1M3 4h1M3 5h1M3 6h1M3 7h1M0 8h1M3 8h1M3 9h1M1 10h1M3 10h1M1 11h1M3 11h1M1 12h1M3 12h1M1 13h3M2 14h2M2 15h2" />
            <path stroke={ xpDark } d="M2 5h1M2 6h1M2 7h1M2 8h1M2 9h1M2 10h1M2 11h1M2 12h1" />
            <path stroke={ xpLight } d="M2 5h1M2" />
            
            {/** Lines */}
            <path stroke={ theme.palette.logo.dark } d={"M4 6h"+(end-3)+"M6"} />
            <path stroke={ theme.palette.logo.dark } d={"M4 10h"+(end-3)+"M6"} />
            <path stroke={ theme.palette.background.paper } d={"M3 7h"+(end-2)+"M4 8h"+(end-2)+"M4 9h"+(end-2)+"M4" } />
            <path stroke={ theme.palette.background.paper } d={"M3 7h"+(end-2)+"M4 8h"+(end-2)+"M4 9h"+(end-2)+"M4" } />
            <path stroke={ theme.palette.background.paper } d={"M"+(end+1)+" 5h1M"+(end+1)+" 6h1M"+(end+1)+" 7h1M"+(end+1)+" 10h1M"+(end+1)+" 11h1M"+(end+1)+" 12h1M"+(end+1)+" 9h1M"+(end+1) } />
            
            {/** XP */}
            <path stroke={ xpDark } d={"M3 7h"+(xp-3)+"M3 8h"+(xp-3)+"M3 9h"+(xp-3)+"M3"} />
            <path stroke={ xpDark } d={"M"+(xp)+" 8h3M"+(xp)+" 9h4M"+(xp)} />
            <path stroke={ xpLight } d={"M3 7h"+(xp)+"M"+(xp+3)+" 8h1"} />

            {/** Right Weight */}
            <path stroke={ theme.palette.logo.light } d={"M"+(end)+" 2h2M"+(end)+" 3h1M"+(end)+" 4h1M"+(end)+" 5h1"} />
            <path stroke={ theme.palette.logo.main } d={"M"+(end+1)+" 3h1M"+(end+1)+" 4h1M"+(end)+" 5h1M"+(end)} />
            <path stroke={ theme.palette.logo.dark } d={"M"+(end+2)+" 4h1M"+(end+2)+" 5h1M"+(end+2)+" 6h1M"+(end+2)+" 7h1M"+(end+2)+" 8h2M"+(end+2)+" 9h1M"+(end+2)+" 10h1M"+(end+2)+" 11h1M"+(end+1)+" 12h2M"+(end+1)+" 13h1M"+(end+1)+" 14h1"} />
            <path stroke={ theme.palette.logo.dark } d={"M"+(end)+" 10h1M"+(end)+" 11h1M"+(end)+" 12h1M"+(end)+" 13h1M"+(end)+" 14h1"} />
            
            <text x="5" y="14" fontSize={3} fontFamily={"Silkscreen"} fill={ theme.palette.text.primary }>LVL { props.level }</text>
            <text x="5" y="4" fontSize={3} fontFamily={"Silkscreen"} fill={ theme.palette.text.primary }>{ props.xp } / { props.xpNext }</text>
        </svg>
    )
}

export default ExperienceBar;