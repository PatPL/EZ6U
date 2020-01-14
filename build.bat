call npm install
@echo on
call tsc
call pkg "./JS/index.js" --targets "latest-win-x64" --output "./Bin/EZ6U_win64"
call pkg "./JS/index.js" --targets "latest-win-x86" --output "./Bin/EZ6U_win32"
call pkg "./JS/index.js" --targets "latest-linux-x64" --output "./Bin/EZ6U_linux64"
call pkg "./JS/index.js" --targets "latest-macos-x64" --output "./Bin/EZ6U_mac64"