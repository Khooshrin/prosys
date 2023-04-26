import * as React from "react"
import { Container } from "@mui/material"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import LogoutIcon from "@mui/icons-material/Logout"
import Toolbar from "@mui/material/Toolbar"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { AppBar } from "../../components/dashboard/Objects"
import { useState, useEffect, } from "react"
import { useProjectsContext } from "../../hooks/useProjectsContext"
import { useAuthContext } from "../../hooks/useAuthContext"
import { serverURL } from "../../utils/constants"
import { useNavigate, useParams } from "react-router-dom"
import { useLogout } from "../../hooks/useLogout"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const theme = createTheme()

const StudentProjectPage = () => {

    const navigate = useNavigate()
    const [project, setProject] = useState({})
    const [midsemGrade, setMidsemGrade] = useState()
    const [compreGrade, setCompreGrade] = useState()
    const [submissionLink, setSubmissionLink] = useState([])
    const [change, setChange] = useState({
        submissionLink: "",
    })
    const { logout } = useLogout()
    const { id } = useParams()
    const { user } = useAuthContext()
    let email = user.email
    const [name, setName] = useState()

    const handleLogout = async (e) => {
        e.preventDefault()
        navigate("/student/login")
        logout()
    }

    const handleHome = (event) => {
        event.preventDefault()
        navigate("/student/dashboard")
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setChange((prevProps) => ({
            ...prevProps,
            [name]: value,
        }))
    }

    const fetchTitles = async (id) => {
        const response = await fetch(serverURL + `/projects/${id}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${user.token}` },
        })
        const json = await response.json()
        if (response.ok) {
            setProject(json)
        }
    }

    const fetchGrades = async (id) => {
        const response = await fetch(serverURL + `/grade`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ studentemail: email, projectID: id })
        })
        const json = await response.json()
        if (response.ok) {
            setMidsemGrade(json.midsemGrade)
            setCompreGrade(json.compreGrade)
        }
    }

    const fetchSubmission = async (id) => {
        const response = await fetch(serverURL + `/submission`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ studentemail: email, projectID: id })
        })
        const json = await response.json()
        if (response.ok) {
            setSubmissionLink(json.submissionLink)
        }
    }

    const createSubmission = async (id, submission) => {
        const response = await fetch(serverURL + `/submission/student`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ studentemail: email, projectID: id, submissionLink: submission })
        })
        const json = await response.json()
        console.log(json)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (change.submissionLink === "") {
            change.submissionLink = submissionLink
        }
        createSubmission(id, change.submissionLink)
    }

    if (user) {
        fetchTitles(id)
        fetchGrades(id)
        fetchSubmission(id)
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Box
                    sx={{
                        marginTop: 10,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <AppBar position="absolute">
                        <Toolbar sx={{ pr: "24px" }}>
                            <Button
                                onClick={handleHome}
                                component="h1"
                                variant="h6"
                                noWrap
                                color="inherit"
                                size="large"
                                startIcon={<ArrowBackIosIcon/>}
                            >
                                ProSys - Student
                            </Button>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                align="center"
                                noWrap
                                sx={{ flexGrow: 1 }}
                            >
                                {JSON.parse(localStorage.getItem("user")).email}
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleLogout}>
                                <Button color="inherit" size="large" startIcon={<LogoutIcon />} type="submit">
                                    LogOut
                                </Button>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column", column: "100%" }}>
                    <Grid item container direction="row">
                        <Grid container>
                            <Grid item xs={6} sx={{ flexBasis: "100%", color: "#363a40" }}>
                                <Typography gutterBottom>Title </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ flexBasis: "100%" }}>
                                <Typography gutterBottom>{project.title}</Typography>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={6} sx={{ flexBasis: "100%", color: "#363a40" }}>
                                <Typography gutterBottom>Professor Email </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ flexBasis: "100%" }}>
                                <Typography gutterBottom>{project.professorEmail}</Typography>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={6} sx={{ flexBasis: "100%", color: "#363a40" }}>
                                <Typography gutterBottom>Description </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ flexBasis: "100%" }}>
                                <Typography gutterBottom>{project.description}</Typography>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={6} sx={{ flexBasis: "100%", color: "#363a40" }}>
                                <Typography gutterBottom>Prerequisite </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ flexBasis: "100%" }}>
                                <Typography gutterBottom>{project.prerequisite}</Typography>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={6} sx={{ flexBasis: "100%", color: "#363a40" }}>
                                <Typography gutterBottom>Project Type </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ flexBasis: "100%" }}>
                                <Typography gutterBottom>{project.projectType}</Typography>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={6} sx={{ flexBasis: "100%", color: "#363a40" }}>
                                <Typography gutterBottom>Accepted Students </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ flexBasis: "100%" }}>
                                <Typography gutterBottom>{project.acceptedStudents}</Typography>
                            </Grid>
                        </Grid>

                    </Grid>

                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Midsem Grade</TableCell>
                                <TableCell>Compre Grade</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                {midsemGrade ?
                                    (<TableCell>{midsemGrade}</TableCell>)
                                    :
                                    (<TableCell>Not Available</TableCell>)
                                }
                                {compreGrade ?
                                    (<TableCell>{compreGrade}</TableCell>)
                                    :
                                    (<TableCell>Not Available</TableCell>)
                                }
                            </TableRow>
                        </TableBody>
                    </Table>

                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>My Submission(s)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                {!submissionLink.length ?
                                    (<TableCell>Not Available</TableCell>)
                                    :
                                    (submissionLink.map(submission => (
                                        <TableCell>{submission}</TableCell>)
                                    ))
                                }
                            </TableRow>
                        </TableBody>
                    </Table>

                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="submissionLink"
                                    name="submissionLink"
                                    label="Your submission"
                                    InputLabelProps={{ shrink: true }}
                                    defaultValue={change.submissionLink}
                                    onChange={handleInputChange}
                                    multiline
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Submit Link
                        </Button>
                    </Box>
                </Card>
            </Container>
        </ThemeProvider>
    )
}

export default StudentProjectPage
