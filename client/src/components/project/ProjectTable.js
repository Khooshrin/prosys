import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Title from "../Title"
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined"
import Button from "@mui/material/Button"
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { useState, useEffect } from "react"
import { useProjectsContext } from "../../hooks/useProjectsContext"
import { useAuthContext } from "../../hooks/useAuthContext"
import { serverURL } from "../../utils/constants"

export default function ProjectTable({ type }) {
    const { projects, dispatch } = useProjectsContext()
    const { user } = useAuthContext()
    const [open, setOpen] = React.useState(false)
    const [textInput, setTextInput] = useState("")
    const [pid, setPid] = useState(null)

    const handleClickOpen = (id) => {
        setPid(id)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleTextInputChange = (event) => {
        setTextInput(event.target.value)
    }

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch(serverURL + "/projects/", {
                method: "GET",
                headers: { Authorization: `Bearer ${user.token}` },
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: "SET_PROJECTS", payload: json })
            }
        }

        if (user) {
            fetchProjects()
        }
    }, [dispatch, user])

    const onAccept = async (id) => {
        await fetch(serverURL + "/augsd/accept", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id }),
        })
        const fetchProjects = async () => {
            const response = await fetch(serverURL + "/projects/", {
                method: "GET",
                headers: { Authorization: `Bearer ${user.token}` },
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: "SET_PROJECTS", payload: json })
            }
        }

        if (user) {
            fetchProjects()
        }
    }

    const onReject = async (id) => {
        await fetch(serverURL + "/augsd/reject", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id, recommendation: textInput }),
        })
        setPid(null)
        setTextInput("")
        handleClose()
        const fetchProjects = async () => {
            const response = await fetch(serverURL + "/projects/", {
                method: "GET",
                headers: { Authorization: `Bearer ${user.token}` },
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: "SET_PROJECTS", payload: json })
            }
        }
        if (user) {
            fetchProjects()
        }
    }

    return (
        <React.Fragment>
            <Title>
                {type === -1 && "Rejected "}
                {type === 0 && "New "}
                {type === 1 && "Approved "}
                Projects
            </Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Project Title</TableCell>
                        <TableCell>Project Type</TableCell>
                        <TableCell>Professor Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Pre-requisites</TableCell>
                        <TableCell>No. of Students</TableCell>
                        {type === -1 && <TableCell>Recommendations</TableCell>}
                        {type === 0 && <TableCell>Operations</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projects &&
                        projects.map(
                            (project) =>
                                project.approved === type && (
                                    <TableRow key={project._id}>
                                        <TableCell>{project.title}</TableCell>
                                        <TableCell>{project.projectType}</TableCell>
                                        <TableCell>{project.professorEmail}</TableCell>
                                        <TableCell>{project.description}</TableCell>
                                        <TableCell>{project.prerequisite}</TableCell>
                                        <TableCell>{project.numberOfStudents}</TableCell>
                                        {type === -1 && project.recommendation !== "" && (
                                            <TableCell>{project.recommendation}</TableCell>
                                        )}
                                        {type === -1 && project.recommendation === "" && (
                                            <TableCell>No recommendation</TableCell>
                                        )}
                                        {type === 0 && (
                                            <TableCell>
                                                <Button
                                                    size="large"
                                                    startIcon={<CheckCircleOutlineOutlinedIcon />}
                                                    type="submit"
                                                    onClick={(e) => onAccept(project._id)}
                                                    style={{
                                                        color: "green",
                                                    }}
                                                >
                                                    Accept
                                                </Button>
                                                <Button
                                                    size="large"
                                                    startIcon={<CancelOutlinedIcon />}
                                                    type="submit"
                                                    onClick={(e) => handleClickOpen(project._id)}
                                                    style={{
                                                        color: "red",
                                                    }}
                                                >
                                                    Reject
                                                </Button>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                )
                        )}
                </TableBody>
            </Table>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Make Recommendations</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Make recommendations to the project proposal before rejecting it so that professors can improve
                        their proposal.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Recommendations"
                        fullWidth
                        variant="standard"
                        onChange={handleTextInputChange}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        style={{
                            color: "red",
                        }}
                        onClick={(e) => onReject(pid)}
                    >
                        Reject
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
