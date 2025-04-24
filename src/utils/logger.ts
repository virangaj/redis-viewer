import chalk from "chalk";

export const Logger = (options: { prefix: string }) => {
  const { prefix = "App" } = options;

  const logMessage = (level: "info" | "error", message: string) => {
    const timestamp = new Date().toISOString();
    const levelColors = {
      info: chalk.blue,
      error: chalk.red,
    };

    const coloredLevel = levelColors[level](level.toUpperCase());
    const coloredPrefix = levelColors[level](`[${prefix}]`);
    const coloredMessage = levelColors[level](`${message}`);
    const formattedMessage = `[${timestamp}] ${coloredPrefix} [${coloredLevel}]: ${coloredMessage}`;

    console.log(formattedMessage);

    // if (level === 'error') {
    //   console.trace(chalk.gray(`[${timestamp}] [${prefix}] [TRACE]`));
    // }
  };

  return {
    info: (message: string) => logMessage("info", message),
    error: (message: string) => logMessage("error", message),
  };
};
