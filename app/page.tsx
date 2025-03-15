"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Github, LoaderCircle, Moon, Share, Sun } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { GitHubIconDark, GitHubIconLight, XIconDark, XIconLight } from "@/lib/icons";
import { getTweetEndings } from "@/lib/tweetEndings";

export default function Home() {
    const [roast, setRoast] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [username, setUsername] = useState("");
    const [roastLength, setRoastLength] = useState("Large");
    const [roastIntensity, setRoastIntensity] = useState("Mild");
    const { theme, systemTheme, setTheme } = useTheme();

    async function handleRoast(getFromDatabase: boolean) {
        if (!username) {
            toast.error("Username cannot be empty");
            return;
        }

        if (!roastLength) {
            toast.error("Please select Roast Length");
            return;
        }

        if (!roastIntensity) {
            toast.error("Please select Roast Intensity");
            return;
        }

        setRoast("");
        setLoading(true);

        // Call the API to get the roast
        const roastTextFromResponse = await fetch(`/${username}`, {
            method: "POST",
            body: JSON.stringify({
                getFromDatabase: getFromDatabase,
                roastLength,
                level: roastIntensity,
            }),
        });

        const userRoastText = await roastTextFromResponse.text();

        if (!userRoastText) {
            toast.error("No such User Found");
            setLoading(false);
            return;
        }

        setLoading(false);
        setRoast(userRoastText);
    }

    const renderRoast = () => {
        try {
            const parsedRoast = JSON.parse(roast);

            // Split the text by newlines and render each line
            return parsedRoast.split("\n").map((line: string, index: number) => (
                <p key={index} className="mb-2">
                    {line}
                </p>
            ));
        } catch (e) {
            console.error("Error parsing JSON:", e);
            return roast; // Fallback to the original text
        }
    };

    async function handleFeedBack() {
        if (!feedback) {
            toast.error("Feedback cannot be empty");
            return;
        }

        setSubmitLoading(true);

        // Call the API to submit the feedback
        try {
            const feedbackResponse = await fetch("/feedback", {
                method: "POST",
                body: JSON.stringify({
                    username,
                    feedback,
                }),
            });

            if (feedbackResponse.status !== 200) {
                const feedbackResponseText = await feedbackResponse.text();
                console.error("Error submitting feedback:", feedbackResponseText);
                toast.error("Error submitting feedback");
                setSubmitLoading(false);
                return;
            }

            toast.success("Feedback Submitted Successfully");
            setFeedback("");
            setSubmitLoading(false);
        } catch (e: any) {
            console.error("Error submitting feedback:", e);
            toast.error("Error submitting feedback");
            setSubmitLoading(false);
            return;
        }
    }

    function handleShare() {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            `${roast.slice(0, 150)}...\n\n${getTweetEndings(roastIntensity)}`
        )}`;
        window.open(url, "_blank");
    }

    return (
        <>
            <div>
                <div className="navbar flex justify-between items-center px-5 h-[8vh] border border-b-gray-200">
                    <div className="font-bold text-xl">Roast-My-GitHub</div>
                    <div className="flex gap-4 items-center">
                        <a
                            href="https://github.com/dharminnagar/roast-my-github"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div className="hidden">
                                {theme} {systemTheme}
                            </div>
                            {theme === "system" ? (
                                systemTheme === "dark" ? (
                                    <GitHubIconLight />
                                ) : (
                                    <GitHubIconDark />
                                )
                            ) : theme === "dark" ? (
                                <GitHubIconLight />
                            ) : (
                                <GitHubIconDark />
                            )}
                        </a>

                        {/* Dropdown Menu for Theme */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                    <span className="sr-only">Toggle theme</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setTheme("light")}>
                                    Light
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("dark")}>
                                    Dark
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("system")}>
                                    System
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button>FeedBack</Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <p className="text-sm text-muted-foreground">
                                            You can give feedback about the app here
                                        </p>
                                    </div>
                                    <div>
                                        <Textarea
                                            placeholder="Enter your feedback here"
                                            onChange={(e) => {
                                                setFeedback(e.target.value);
                                            }}
                                        />
                                    </div>

                                    <Button onClick={handleFeedBack} popoverTargetAction="hide">
                                        {submitLoading && <LoaderCircle className="animate-spin" />}
                                        {submitLoading && <div>Submitting...</div>}
                                        {!submitLoading && "Submit"}
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                <div className="h-[92vh] pt-5">
                    <div className="flex justify-center text-lg">
                        Get a Roast of your GitHub profile based on your activity and contributions
                    </div>
                    <div className="flex flex-col items-center justify-center gap-4 mt-5">
                        <Input
                            type="text"
                            placeholder="Enter your GitHub username"
                            className="w-96"
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        {/* Roast Options Dropdown */}
                        <div className="options flex gap-4">
                            <Select onValueChange={setRoastIntensity}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Roast Intensity" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Roast Intensity</SelectLabel>
                                        <SelectItem value="mild">Mild</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="extreme">Extreme</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Select onValueChange={setRoastLength}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Roast Length" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Roast Length</SelectLabel>
                                        <SelectItem value="1">Short</SelectItem>
                                        <SelectItem value="2">Medium</SelectItem>
                                        <SelectItem value="3">Large</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex gap-4">
                            {!roast && (
                                <Button className="w-32" onClick={() => handleRoast(false)}>
                                    {loading && <LoaderCircle className="animate-spin" />}
                                    {loading && <div>Roasting...</div>}
                                    {!loading && "Roast Me"}
                                </Button>
                            )}
                            {roast && (
                                <Button className="w-32" onClick={() => handleRoast(false)}>
                                    {loading && <LoaderCircle className="animate-spin" />}
                                    {loading && <div>Roasting...</div>}
                                    {!loading && `New Roast`}
                                </Button>
                            )}
                            {/* {roast && ( */}
                            <Button className="w-32" onClick={handleShare}>
                                {theme === "system" ? (
                                    systemTheme === "dark" ? (
                                        <XIconDark />
                                    ) : (
                                        <XIconLight />
                                    )
                                ) : theme === "dark" ? (
                                    <XIconDark />
                                ) : (
                                    <XIconLight />
                                )}
                                Share
                            </Button>
                            {/* )} */}
                        </div>
                    </div>

                    <div className="roast pt-5 flex justify-center">
                        {roast && (
                            <div className="w-[80vw] bg-neutral-100 dark:bg-neutral-700 p-3 rounded-md">
                                {renderRoast()}
                            </div>
                        )}
                        {loading && (
                            <div className="flex items-center space-x-4 w-[80vw] p-3 rounded-md bg-neutral-100 dark:bg-neutral-800 bg-opacity-10">
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[75vw] bg-neutral-400 dark:bg-neutral-700" />
                                    <Skeleton className="h-4 w-[70vw] bg-neutral-400 dark:bg-neutral-700" />
                                    <Skeleton className="h-4 w-[60vw] bg-neutral-400 dark:bg-neutral-700" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
