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
import { Github, LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

export default function Home() {
    const [roast, setRoast] = useState("");
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [roastLength, setRoastLength] = useState("Large");
    const [roastIntensity, setRoastIntensity] = useState("Mild");

    async function handleRoast() {
        if (!username) {
            toast("Input Error", {
                description: "Username cannot be empty",
            });
            return;
        }

        if (!roastLength) {
            toast("Input Error", {
                description: "Please select Roast Length",
            });
            return;
        }

        if (!roastIntensity) {
            toast("Input Error", {
                description: "Please select Roast Intensity",
            });
            return;
        }

        setRoast("");
        setLoading(true);
        console.log("Roasting User:", username);
        console.log("Roast Length:", roastLength);
        console.log("Roast Intensity:", roastIntensity);

        // Call the API to get the roast
        const roastTextFromResponse = await fetch(`/${username}`, {
            method: "POST",
            body: JSON.stringify({
                roastLength,
                level: roastIntensity,
            }),
        });

        const userRoastText = await roastTextFromResponse.text();

        setLoading(false);
        setRoast(userRoastText);
    }

    const renderRoast = () => {
        try {
            const parsedRoast = JSON.parse(roast);

            // Split the text by newlines and render each line
            return parsedRoast
                .split("\n")
                .map((line: string, index: number) => (
                    <p key={index} className="mb-2">
                        {line}
                    </p>
                ));
        } catch (e) {
            console.error("Error parsing JSON:", e);
            return roast; // Fallback to the original text
        }
    };

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
                            <Github />
                        </a>
                        <Button onClick={handleFeedBack}>FeedBack</Button>
                    </div>
                </div>

                <div className="h-[92vh] pt-5">
                    <div className="flex justify-center text-lg">
                        Get a Roast of your GitHub profile based on your
                        activity and contributions
                    </div>
                    <div className="flex flex-col items-center justify-center gap-4 mt-5">
                        <Input
                            type="text"
                            placeholder="Enter your GitHub username"
                            className="w-96"
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <div className="options flex gap-4">
                            <Select onValueChange={setRoastIntensity}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Roast Intensity" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>
                                            Roast Intensity
                                        </SelectLabel>
                                        <SelectItem value="Mild">
                                            Mild
                                        </SelectItem>
                                        <SelectItem value="Medium">
                                            Medium
                                        </SelectItem>
                                        <SelectItem value="Extreme">
                                            Extreme
                                        </SelectItem>
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
                                        <SelectItem value="Short">
                                            Short
                                        </SelectItem>
                                        <SelectItem value="Medium">
                                            Medium
                                        </SelectItem>
                                        <SelectItem value="Large">
                                            Large
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button className="w-32" onClick={handleRoast}>
                            {loading && (
                                <LoaderCircle className="animate-spin" />
                            )}
                            {loading && <div>Roasting...</div>}
                            {!loading && "Roast Me"}
                        </Button>
                    </div>

                    {/* TODO: Will have to render Markdown here */}
                    <div className="roast pt-5 flex justify-center">
                        {roast && (
                            <div className="w-[80vw] bg-neutral-700 p-3 rounded-md">
                                {/* {`${JSON.parse(roast)}`} */}
                                {renderRoast()}
                            </div>
                        )}

                        {loading && (
                            <div className="flex items-center space-x-4 w-[80vw] p-3 rounded-md bg-neutral-800 bg-opacity-10">
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[75vw] bg-neutral-700" />
                                    <Skeleton className="h-4 w-[70vw] bg-neutral-700" />
                                    <Skeleton className="h-4 w-[60vw] bg-neutral-700" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

const handleFeedBack = () => {
    alert("This feature is not available yet");
};
