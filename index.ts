import { db }  from '@/db'
import { filings } from '@/db/schema'
import { eq } from 'drizzle-orm'

const text = `This filing is a request to clarify the legal status and ownership of the "Uniswap V4 Core" software published under a Business Source License 1.1 on June 7, 2023 (the "Uniswap License") to the following Github repository: https://github.com/Uniswap/v4-core

The Uniswap Github repository is altogether published under the organization name "Uniswap Labs". Uniswap Labs is commonly understood as the “doing business as” (or DBA) name of the entity listed in the Uniswap software privacy policy (https://uniswap.org/privacy-policy), which is Universal Navigation Inc., a Delaware corporation formed in 2018 under file # 7053324.

The text of the latest Uniswap License is excerpted in full below (from https://github.com/Uniswap/v4-core/blob/main/LICENSE):

\`\`\`
Business Source License 1.1

License text copyright (c) 2017 MariaDB Corporation Ab, All Rights Reserved.
"Business Source License" is a trademark of MariaDB Corporation Ab.

-----------------------------------------------------------------------------

Parameters

Licensor:             Uniswap Labs

Licensed Work:        Uniswap V4 Core
                      The Licensed Work is (c) 2023 Uniswap Labs

Additional Use Grant: Any uses listed and defined at
                      v4-core-license-grants.uniswap.eth

Change Date:          The earlier of 2027-06-15 or a date specified at
                      v4-core-license-date.uniswap.eth

Change License:       GNU General Public License v2.0 or later

-----------------------------------------------------------------------------

Terms

The Licensor hereby grants you the right to copy, modify, create derivative
works, redistribute, and make non-production use of the Licensed Work. The
Licensor may make an Additional Use Grant, above, permitting limited
production use.

Effective on the Change Date, or the fourth anniversary of the first publicly
available distribution of a specific version of the Licensed Work under this
License, whichever comes first, the Licensor hereby grants you rights under
the terms of the Change License, and the rights granted in the paragraph
above terminate.

If your use of the Licensed Work does not comply with the requirements
currently in effect as described in this License, you must purchase a
commercial license from the Licensor, its affiliated entities, or authorized
resellers, or you must refrain from using the Licensed Work.

All copies of the original and modified Licensed Work, and derivative works
of the Licensed Work, are subject to this License. This License applies
separately for each version of the Licensed Work and the Change Date may vary
for each version of the Licensed Work released by Licensor.

You must conspicuously display this License on each original or modified copy
of the Licensed Work. If you receive the Licensed Work in original or
modified form from a third party, the terms and conditions set forth in this
License apply to your use of that work.

Any use of the Licensed Work in violation of this License will automatically
terminate your rights under this License for the current and all other
versions of the Licensed Work.

This License does not grant you any right in any trademark or logo of
Licensor or its affiliates (provided that you may use a trademark or logo of
Licensor as expressly required by this License).

TO THE EXTENT PERMITTED BY APPLICABLE LAW, THE LICENSED WORK IS PROVIDED ON
AN "AS IS" BASIS. LICENSOR HEREBY DISCLAIMS ALL WARRANTIES AND CONDITIONS,
EXPRESS OR IMPLIED, INCLUDING (WITHOUT LIMITATION) WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND
TITLE.

MariaDB hereby grants you permission to use this License’s text to license
your works, and to refer to it using the trademark "Business Source License",
as long as you comply with the Covenants of Licensor below.

-----------------------------------------------------------------------------

Covenants of Licensor

In consideration of the right to use this License’s text and the "Business
Source License" name and trademark, Licensor covenants to MariaDB, and to all
other recipients of the licensed work to be provided by Licensor:

1. To specify as the Change License the GPL Version 2.0 or any later version,
   or a license that is compatible with GPL Version 2.0 or a later version,
   where "compatible" means that software provided under the Change License can
   be included in a program with software provided under GPL Version 2.0 or a
   later version. Licensor may specify additional Change Licenses without
   limitation.

2. To either: (a) specify an additional grant of rights to use that does not
   impose any additional restriction on the right granted in this License, as
   the Additional Use Grant; or (b) insert the text "None".

3. To specify a Change Date.

4. Not to modify this License in any other way.

-----------------------------------------------------------------------------

Notice

The Business Source License (this document, or the "License") is not an Open
Source license. However, the Licensed Work will eventually be made available
under an Open Source License, as stated in this License.
\`\`\`

As detailed in the Uniswap License, the effective controller of the "uniswap.eth" domain has the ability to change the conversion date of the Uniswap License from source-available to a more open-source format (i.e., GPL) earlier than June 15, 2027, as well as to make certain grants for use of the licensed Uniswap software (in this case, Uniswap V4 Core, and such grants, "Additional Use Grants"). This effective controller is the timelock smart contract deployed to the Ethereum blockchain address 0x1a9C8182C09F50C8318d769245beA52c32BE35BC, which itself is governed by a smart contract that settles state changes (such as to the uniswap.eth domain and Uniswap protocol fee distribution, including V4 code) based on the voting outcomes recorded by the governance smart contract ("Uniswap Governor Bravo") located at the Ethereum blockchain address 0x408ED6354d4973f66138C91495F2f2FCbd8724C3, where such governance is based on balances of UNI tokens (similarly located at 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984, which tokens were originally distributed to supporters and users of Uniswap products, such as its Ethereum-based exchanges (the details of such UNI distribution can be reviewed here: https://blog.uniswap.org/uni), together and commonly, "Uni DAO").

The question presented based on this background is the following: *Does the text of the Uniswap License and surrounding circumstances, including related legal events and common practice, suggest the primary owners of the Uniswap V4 Core software is Uni DAO, the association of UNI token holders, or the Delaware corporation, Uniswap Labs?*`



const main = async () => {
    await db.update(filings).set({
        description: text,
    }).where(eq(filings.id, '51b096ca-67e5-4ac6-a97f-5060c53de536')).execute()
}

main().catch(console.error).then(() => 'done')