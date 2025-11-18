<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# figma make how to get console display not currently displayed could a rule be preventing it?

When the Figma Make console is not displaying, common causes include hidden UI panels, certain workspace rules, or environment-specific restrictions that may prevent console output. There is no universal "rule" that disables the console in Figma Make, but several scenarios could lead to it not appearing:

### Common Causes for Missing Console

- The console panel may be minimized, docked, or hidden within the Figma Make UI, especially if your workspace or plugin window dimensions have changed recently.[^1_1]
- If working within an embedded iframe, certain parameters or restrictions (such as `disableConsole` in an embed URL) can suppress console output, though this is usually relevant to shared or embedded Figma views rather than Figma Make directly.[^1_2]
- In plugin development, only specialized tools like the "Figma Console MCP" expose live console logs; standard Figma Make use does not guarantee persistent console output for all actions or errors.[^1_1]
- Workspace-specific group permissions (in managed Figma environments) or browser extensions may also block or hide developer consoles.


### Troubleshooting Steps

- Ensure you're in the correct mode/view: The console may only show for code or plugin development contexts and not while simply editing a design or prototype.[^1_3][^1_1]
- Resize or undock the plugin or code panel to reveal hidden UI areas.[^1_1]
- Try restarting Figma Make and clearing browser cache if working in the web app; sometimes UI glitches hide panels.[^1_4]
- If using Figma Make in an embedded or restricted environment, check for iframe or browser console-blocking rules.[^1_2]


### If Rules or Policies Are Involved

- Check with your workspace admin if any enterprise or group-wide UI customization or browser security policies are preventing the console window from appearing.
- Some managed configurations may restrict interactive or developer views for security reasons, particularly in enterprise settings.

If none of these resolve the issue, reaching out to Figma support with a detailed description and screenshots will help, as there could be a newly introduced bug or limitation.[^1_4]
<span style="display:none">[^1_10][^1_5][^1_6][^1_7][^1_8][^1_9]</span>

<div align="center">⁂</div>

[^1_1]: https://lobehub.com/mcp/southleft-figma-console-mcp

[^1_2]: https://forum.figma.com/share-your-feedback-26/disable-console-output-in-iframe-embeds-8464

[^1_3]: https://www.figma.com/blog/8-ways-to-build-with-figma-make/

[^1_4]: https://forum.figma.com/report-a-problem-6/issue-url-provided-by-figma-make-after-publishing-displays-blank-screen-41999

[^1_5]: https://forum.figma.com/suggest-a-feature-11/disable-observe-mode-18772/index5.html

[^1_6]: https://forum.figma.com/suggest-a-feature-11/provide-ability-to-prevent-updates-from-automatically-appearing-in-prototypes-after-sharing-them-externally-9129

[^1_7]: https://stackoverflow.com/questions/74888057/how-to-prevent-figma-agent-to-be-added-to-login-items

[^1_8]: https://www.youtube.com/watch?v=zRax86wOXqE

[^1_9]: https://forum.figma.com/suggest-a-feature-11/prototype-console-to-display-variable-values-for-troubleshooting-20875

[^1_10]: https://forum.figma.com/report-a-problem-6/figma-make-not-working-42626


---

# Check if browser developer tools filters block console messages

Browser developer tools (such as Chrome DevTools, Firefox Developer Tools, or Edge DevTools) have filters that can block certain types of console messages—including logs, warnings, errors, and info. If these filters are active, messages from Figma Make (or any other app) might not appear in your browser’s console.

### How to Check and Adjust Console Filters

- Open your browser's developer tools (usually with F12 or Ctrl+Shift+I).
- Go to the "Console" tab.
- Look for filter buttons or dropdowns—these often allow you to show/hide types of messages like "Log," "Info," "Warnings," or "Errors."
- Make sure all relevant message types are enabled so you don't miss important output.
- Some browsers also have text-based filters or search fields at the top of the console—clear these to ensure no messages are being screened out.


### Additional Considerations

- If no logs appear at all, verify you're on the correct browser tab/window and targeting the right frame or context (for example, some logs may only appear if the relevant iframe is selected).
- Clear any persistent filters and refresh your page to ensure messages come through.

Adjusting these filters is a common troubleshooting step and can quickly reveal whether console output is being inadvertently hidden by your local developer tools settings.[^2_1]

<div align="center">⁂</div>

[^2_1]: https://forum.figma.com/share-your-feedback-26/disable-console-output-in-iframe-embeds-8464

