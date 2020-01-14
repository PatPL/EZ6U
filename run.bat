call npm install
@echo on
call tsc
start tsc -w
call supervisor ./JS/index.js