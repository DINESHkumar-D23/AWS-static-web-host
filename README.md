AWS Static Web Host

This project shows how to host a static website using Amazon Web Services (AWS). The main services used are:

S3 to store the static files like HTML, CSS, JavaScript

CloudFront delivers the website fast all around the world

Lambda (used like a proxy) to help with redirects or header changes

What this project contains

The "public" folder holds the static files (like index.html)

The "src" folder contains the source code (if you used React or similar)

The "build" folder is the final output after you run the build command

The "lambda" folder (if included) has the code for Lambda to handle things like redirects

Services Used and Their Purpose

S3 is used to store and host the website files.
CloudFront makes the website load faster by caching it across global servers.
Lambda is used to make changes to the request or response, like adding headers or redirecting URLs.
Route 53 can be used if you want to add your custom domain.

Steps to Host the Website

First, run the build command to get the final output.
For example, if this is a React app, use:

npm install

npm run build

Go to the AWS S3 console.

Create a new bucket.

Enable static website hosting.

Upload the files from the build folder.

Set the bucket permissions to allow public read access or use CloudFront with OAI.

Go to the AWS CloudFront console.

Create a new distribution.

Set the origin to your S3 bucket.

(Optional) Attach a Lambda function if you want to handle things like URL rewriting.

If you're using Lambda as a proxy:

It can be used to redirect pages (like from /home to /index.html)

Add security headers

Log requests

Attach the function in the CloudFront settings (viewer request or origin request)
My website Domain Name: 'ddq08qbfddfbu.cloudfront.net' (NOTE: THE DOMAIN IS NOT STILL AVAILABLE).

Things to Remember

If you update your site, don't forget to invalidate the CloudFront cache so the new version appears.

Make sure the S3 bucket is accessible from CloudFront.

Use HTTPS and set up custom domains if needed through Route 53.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
About the Project:

Job Tracker

Purpose
Job Tracker is a simple React web application designed to help users find job listings and keep track of jobs they are interested in. Users can search for jobs by title and location, view the top results, and save jobs for future reference.

Features

https://github.com/user-attachments/assets/ea351175-3be3-4ba3-94ec-7df7df14b296


Search jobs by title and location
View top job results with details (title, company, location)
Track jobs and save them locally using browser localStorage
Clean, modern UI for easy job management
API Used
This app uses the JSearch API from RapidAPI to fetch job listings. The API is accessed via the endpoint:

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

About Me:

Project by Dineshkumar D,
GitHub: github.com/DINESHkumar-D23,
LinkedIn: linkedin.com/in/dineshkumar-d-b54a21325.

