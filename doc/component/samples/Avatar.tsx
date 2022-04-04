import React from 'react'
import Avatar from '@mui/material/Avatar'
import { deepOrange, deepPurple, pink, green } from '@mui/material/colors'
import FolderIcon from '@mui/icons-material/Folder'
import PageviewIcon from '@mui/icons-material/Pageview'
import AssignmentIcon from '@mui/icons-material/Assignment'
import AvatarGroup from '@mui/material/AvatarGroup'

import { styled } from '@mui/material/styles'
import { useMemoEmpty } from 'app/hooks/useMemoEmpty'

export default function AvatarExample() {
  const ROOT = useMemoEmpty(
    () =>
      styled('div')`
        ${{
          display: 'flex',
          justifyContent: 'space-between',
        }}

        .avatarSet {
          ${({ theme }) => ({
            display: 'flex',
            margin: theme.spacing(2),
          })}

          & > * {
            ${({ theme }) => ({
              margin: theme.spacing(1),
            })}
          }
        }
        .orange {
          ${({ theme }) => ({
            color: theme.palette.getContrastText(deepOrange[500]),
            backgroundColor: deepOrange[500],
          })}
        }
        .purple {
          ${({ theme }) => ({
            color: theme.palette.getContrastText(deepPurple[500]),
            backgroundColor: deepPurple[500],
          })}
        }
        .pink {
          ${({ theme }) => ({
            color: theme.palette.getContrastText(pink[500]),
            backgroundColor: pink[500],
          })}
        }
        .green {
          ${() => ({
            color: '#fff',
            backgroundColor: green[500],
          })}
        }
        .small {
          ${({ theme }) => ({
            width: theme.spacing(3),
            height: theme.spacing(3),
          })}
        }
        .large {
          ${({ theme }) => ({
            width: theme.spacing(7),
            height: theme.spacing(7),
          })}
        }
      `
  )

  return (
    <ROOT>
      <div className="avatarSet">
        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
        <Avatar alt="Travis Howard" src="https://material-ui.com/static/images/avatar/2.jpg" />
        <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/3.jpg" />
      </div>
      <div className="avatarSet">
        <Avatar>H</Avatar>
        <Avatar className="orange">N</Avatar>
        <Avatar className="purple">OP</Avatar>
      </div>
      <div className="avatarSet">
        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" className="small" />
        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" className="large" />
      </div>
      <div className="avatarSet">
        <Avatar>
          <FolderIcon />
        </Avatar>
        <Avatar className="pink">
          <PageviewIcon />
        </Avatar>
        <Avatar className="green">
          <AssignmentIcon />
        </Avatar>
      </div>
      <div className="avatarSet">
        <AvatarGroup max={4}>
          <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
          <Avatar alt="Travis Howard" src="https://material-ui.com/static/images/avatar/2.jpg" />
          <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/3.jpg" />
          <Avatar alt="Agnes Walker" src="https://material-ui.com/static/images/avatar/4.jpg" />
          <Avatar alt="Trevor Henderson" src="https://material-ui.com/static/images/avatar/5.jpg" />
        </AvatarGroup>
      </div>
    </ROOT>
  )
}
