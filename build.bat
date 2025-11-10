@echo off
echo Building Bunny Hop Game Executable...
echo.

echo Installing dependencies...
npm install

echo.
echo Building Windows executable...
npm run build-win

echo.
echo Build complete! Check the 'dist' folder for your executable.
echo.
pause 